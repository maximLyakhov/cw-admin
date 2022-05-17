import {Component, Input} from '@angular/core'

@Component({
	selector: 'cw-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() buttonText: string | undefined
	@Input() buttonDisabled: boolean | undefined
	@Input() buttonIcon: string | undefined
	@Input() buttonType: string | undefined
	@Input() inverted: boolean = false
}
