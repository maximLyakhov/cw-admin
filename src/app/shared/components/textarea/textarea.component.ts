import {Component, ChangeDetectionStrategy, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
    selector: 'cwb-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: Validators.minLength(1),
            multi: true
        },
    ]
})
export class TextareaComponent implements ControlValueAccessor {
    @Input() inputLabel: string | undefined
    @Input() inputPlaceholder: string | undefined
    @Input() inputName!: string | number | null
    @Input() inputDisabled: boolean | string = false
    @Input() rows: number = 3
    public value = ''

    onChange: any = () => {
    }

    onTouch: any = () => {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn
    }

    writeValue(value: string): void {
        this.value = value
    }
}
