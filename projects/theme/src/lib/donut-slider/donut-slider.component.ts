import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  Pipe,
  PipeTransform,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';

// Tiny pure pipe used inline for the |abs filter — kept private to this file
// so we don't widen the public API for a single template helper.
@Pipe({ name: 'btAbs', standalone: true })
class AbsPipe implements PipeTransform {
  transform(value: number): number {
    return Math.abs(value);
  }
}

/**
 * A mobile-first donut-style circular range slider for numeric input.
 *
 * The dial is an *unbounded rotation accumulator*: dragging clockwise
 * keeps adding to the value indefinitely (and counter-clockwise keeps
 * subtracting). One full revolution adds `valuePerTurn`, so the consumer
 * picks how much a single turn is worth.
 *
 * ```html
 * <bt-donut-slider
 *   label="Amount"
 *   unit="€"
 *   [(value)]="amount"
 *   [valuePerTurn]="100"
 *   [step]="1"
 * />
 * ```
 *
 * Optional `min` / `max` clamp the accumulator. By default the slider is
 * unbounded.
 *
 * The component reads as a single number for screen readers
 * (`role="slider"`, `aria-valuenow`), and supports keyboard interaction
 * (arrows step by `step`, Page Up/Down step by `valuePerTurn / 10`).
 */
@Component({
  selector: 'bt-donut-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [AbsPipe],
  host: {
    class: 'bt-donut-slider',
    role: 'slider',
    tabindex: '0',
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuemin]': 'min() ?? null',
    '[attr.aria-valuemax]': 'max() ?? null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[style.--bt-donut-slider-size.px]': 'size()',
    '[class.bt-donut-slider--disabled]': 'disabled()',
    '[class.bt-donut-slider--dragging]': 'dragging()',
  },
  template: `
    <svg
      class="bt-donut-slider__svg"
      [attr.viewBox]="'0 0 ' + size() + ' ' + size()"
      draggable="false"
      (pointerdown)="onPointerDown($event)"
      (dragstart)="$event.preventDefault()"
    >
      <circle
        class="bt-donut-slider__track"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="stroke()"
      />
      @if (turnAngle() > 0.5) {
        <path
          class="bt-donut-slider__progress"
          [attr.d]="arcPath()"
          [attr.stroke-width]="stroke()"
        />
      }
      <circle
        class="bt-donut-slider__handle"
        [attr.cx]="handle().x"
        [attr.cy]="handle().y"
        [attr.r]="stroke() / 2 + 2"
      />
    </svg>
    <div class="bt-donut-slider__readout" aria-hidden="true">
      @if (label()) {
        <span class="bt-donut-slider__label">{{ label() }}</span>
      }
      <span class="bt-donut-slider__value">
        {{ displayValue() }}<!--
        -->@if (unit(); as u) {<span class="bt-donut-slider__unit">{{ u }}</span>}
      </span>
      @if (turnCount() !== 0) {
        <span class="bt-donut-slider__turns">
          {{ turnCount() | btAbs }}
          {{ turnCount() === 1 || turnCount() === -1 ? 'turn' : 'turns' }}
        </span>
      }
    </div>
  `,
  styles: `
    .bt-donut-slider {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      width: var(--bt-donut-slider-size, 14rem);
      max-width: 100%;
      outline: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .bt-donut-slider:focus-visible .bt-donut-slider__handle {
      stroke: var(--bt-link);
      stroke-width: 3;
    }

    .bt-donut-slider__svg {
      display: block;
      width: 100%;
      height: auto;
      // Disable both touch scrolling and the desktop browser's native drag
      // image / text selection that competes with our pointer drag.
      touch-action: none;
      -webkit-user-drag: none;
      cursor: grab;
    }

    .bt-donut-slider--dragging .bt-donut-slider__svg {
      cursor: grabbing;
    }

    .bt-donut-slider--disabled .bt-donut-slider__svg {
      cursor: not-allowed;
      opacity: 0.55;
    }

    .bt-donut-slider__track {
      fill: none;
      stroke: var(--bt-surface-2);
    }

    .bt-donut-slider__progress {
      fill: none;
      stroke: var(--bt-link);
      stroke-linecap: round;
    }

    .bt-donut-slider__handle {
      fill: var(--bt-text-strong);
      stroke: var(--bt-link);
      stroke-width: 2;
    }

    .bt-donut-slider__readout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.125rem;
      line-height: 1.1;
      text-align: center;
    }

    .bt-donut-slider__label {
      font-size: 0.75rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--bt-text-muted);
    }

    .bt-donut-slider__value {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--bt-text-strong);
      font-variant-numeric: tabular-nums;
    }

    .bt-donut-slider__unit {
      margin-inline-start: 0.25rem;
      font-size: 1rem;
      font-weight: 500;
      color: var(--bt-text-muted);
    }

    .bt-donut-slider__turns {
      font-size: 0.75rem;
      color: var(--bt-text-muted);
    }
  `,
})
export class DonutSliderComponent {
  /** Current value (two-way bindable via `[(value)]`). */
  readonly value = model<number>(0);
  /** How much a full revolution adds to the value. */
  readonly valuePerTurn = input<number>(100);
  /** Step size for keyboard interaction and the snap-to grid. */
  readonly step = input<number>(1);
  /** Optional lower clamp. Omit (or set `0`) to prevent negative values. */
  readonly min = input<number | undefined>(undefined);
  /** Optional upper clamp. Omit for unbounded upward rotation. */
  readonly max = input<number | undefined>(undefined);
  /** Short label rendered above the readout. */
  readonly label = input<string>('');
  /** Unit suffix rendered after the value (e.g. "€", "ml"). */
  readonly unit = input<string>('');
  /** Diameter of the dial in pixels (becomes the SVG viewBox). */
  readonly size = input<number>(220);
  /** Number of decimal places shown in the readout. */
  readonly displayDecimals = input<number>(0);
  /** Disables drag and keyboard input. */
  readonly disabled = input<boolean>(false);

  /** Emitted on every committed value change. */
  readonly valueChange = output<number>();

  // --- Geometry ------------------------------------------------------------
  protected readonly stroke = computed(() => Math.round(this.size() * 0.14));
  protected readonly center = computed(() => this.size() / 2);
  protected readonly radius = computed(
    () => this.center() - this.stroke() / 2 - 4,
  );

  // --- Value → angle / turn math ------------------------------------------
  protected readonly turnAngle = computed(() => {
    const fraction = mod(this.value() / this.valuePerTurn(), 1);
    return fraction * 360;
  });

  protected readonly turnCount = computed(() =>
    Math.trunc(this.value() / this.valuePerTurn()),
  );

  protected readonly arcPath = computed(() => {
    const cx = this.center();
    const r = this.radius();
    const a = this.turnAngle();
    if (a <= 0 || a >= 360) return '';
    const start = polarToCartesian(cx, cx, r, 0);
    const end = polarToCartesian(cx, cx, r, a);
    const largeArc = a > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  });

  protected readonly handle = computed(() =>
    polarToCartesian(this.center(), this.center(), this.radius(), this.turnAngle()),
  );

  protected readonly displayValue = computed(() => {
    const decimals = Math.max(0, Math.trunc(this.displayDecimals()));
    return this.value().toFixed(decimals);
  });

  // --- Pointer drag --------------------------------------------------------
  //
  // Position-based, roundSlider-style: every move reads the cursor's absolute
  // angle on the dial and snaps the value to that angle. There's no delta
  // accumulator, so missed or out-of-order events can't drift the dial out of
  // sync with the cursor. Multi-turn support is layered on top: during a drag
  // we count how many times the cursor crosses the 0°/360° seam and add that
  // many `valuePerTurn` to the position-derived value. On initial click we
  // pick the *nearest* turn so a tap near the seam never makes the value
  // teleport across a whole revolution.
  //
  // Move and up listeners are attached to `document` (Chrome supports pointer
  // events natively, but document-level listeners are immune to the cursor
  // leaving the dial mid-drag — the classic "sometimes works on desktop"
  // failure mode).
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly dragging = signal(false);
  private dragSvg: SVGElement | null = null;
  private dragPointerId: number | null = null;
  /** Last absolute pointer angle in degrees [0, 360). */
  private dragLastPointerAngle = 0;
  /** Signed integer turn offset accumulated during the current drag. */
  private dragTurnOffset = 0;

  private readonly onDocumentMove = (event: PointerEvent): void => {
    if (this.dragSvg === null || event.pointerId !== this.dragPointerId) return;
    const angle = pointerAngle(event, this.dragSvg);
    // Detect 0°/360° seam crossings to track full revolutions.
    if (this.dragLastPointerAngle > 270 && angle < 90) this.dragTurnOffset += 1;
    else if (this.dragLastPointerAngle < 90 && angle > 270)
      this.dragTurnOffset -= 1;
    this.dragLastPointerAngle = angle;
    this.commit(this.angleToValue(angle, this.dragTurnOffset));
    event.preventDefault();
  };

  private readonly onDocumentUp = (event: PointerEvent): void => {
    if (event.pointerId !== this.dragPointerId) return;
    this.endDrag();
  };

  constructor() {
    // Guarantee teardown if the host is destroyed mid-drag.
    this.destroyRef.onDestroy(() => this.endDrag());
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.disabled()) return;
    // Ignore secondary mouse buttons so right-/middle-click don't start a drag.
    if (event.button !== undefined && event.button !== 0) return;
    const svg = event.currentTarget as SVGElement;
    const angle = pointerAngle(event, svg);

    // Pick the nearest-turn so a tap close to either side of the seam doesn't
    // teleport the value across a whole `valuePerTurn`.
    this.dragTurnOffset = nearestTurn(this.value(), angle, this.valuePerTurn());
    this.dragLastPointerAngle = angle;

    this.dragSvg = svg;
    this.dragPointerId = event.pointerId;
    this.dragging.set(true);

    this.document.addEventListener('pointermove', this.onDocumentMove);
    this.document.addEventListener('pointerup', this.onDocumentUp);
    this.document.addEventListener('pointercancel', this.onDocumentUp);

    // Tap-to-jump: commit immediately so a click without drag still snaps the
    // handle to where the user clicked (matches roundSlider behaviour).
    this.commit(this.angleToValue(angle, this.dragTurnOffset));
    event.preventDefault();
  }

  private endDrag(): void {
    if (this.dragSvg === null) return;
    this.document.removeEventListener('pointermove', this.onDocumentMove);
    this.document.removeEventListener('pointerup', this.onDocumentUp);
    this.document.removeEventListener('pointercancel', this.onDocumentUp);
    this.dragSvg = null;
    this.dragPointerId = null;
    this.dragging.set(false);
  }

  private angleToValue(angle: number, turn: number): number {
    return (turn + angle / 360) * this.valuePerTurn();
  }

  // --- Keyboard ------------------------------------------------------------
  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const step = this.step();
    const big = this.valuePerTurn() / 10;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        this.bump(step);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        this.bump(-step);
        break;
      case 'PageUp':
        this.bump(big);
        break;
      case 'PageDown':
        this.bump(-big);
        break;
      case 'Home':
        if (this.min() !== undefined) this.commit(this.min() as number);
        return;
      case 'End':
        if (this.max() !== undefined) this.commit(this.max() as number);
        return;
      default:
        return;
    }
    event.preventDefault();
  }

  // --- Value commit --------------------------------------------------------
  private bump(delta: number): void {
    this.commit(this.value() + delta);
  }

  private commit(raw: number): void {
    const stepped = this.snapToStep(raw);
    const clamped = this.clamp(stepped);
    if (clamped === this.value()) return;
    this.value.set(clamped);
    this.valueChange.emit(clamped);
  }

  private snapToStep(value: number): number {
    const step = this.step();
    if (!step || step <= 0) return value;
    return Math.round(value / step) * step;
  }

  private clamp(value: number): number {
    const min = this.min();
    const max = this.max();
    if (min !== undefined && value < min) return min;
    if (max !== undefined && value > max) return max;
    return value;
  }
}

// =============================================================================
// Helpers
// =============================================================================

function mod(value: number, m: number): number {
  // Always-positive modulo so the turn fraction wraps cleanly across zero.
  return ((value % m) + m) % m;
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDegrees: number,
): { x: number; y: number } {
  // 0° = 12 o'clock, positive = clockwise.
  const angle = ((angleDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function pointerAngle(event: PointerEvent, svg: SVGElement): number {
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  // `atan2(x, -y)`: rotates so 0° = 12 o'clock, increasing clockwise.
  let angle = (Math.atan2(x, -y) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Pick the integer turn whose `(turn + angle/360) * valuePerTurn` is closest
 * to `currentValue`. Used on initial click so a tap near the 0°/360° seam
 * commits to the same revolution the dial is already on, not a turn away.
 */
function nearestTurn(
  currentValue: number,
  pointerAngleDeg: number,
  valuePerTurn: number,
): number {
  const angleValue = (pointerAngleDeg / 360) * valuePerTurn;
  return Math.round((currentValue - angleValue) / valuePerTurn);
}
