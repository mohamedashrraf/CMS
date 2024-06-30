import { Meta, StoryObj } from '@storybook/angular';

import { PopupComponent } from './popup.component';

const meta: Meta<PopupComponent> = {
    title: 'Components/Popup',
    component: PopupComponent
}

export default meta;
type Story = StoryObj<PopupComponent>;

export const Popup: Story = {
    args: {
        message: 'Any Message For Confirmation!!!',
        errorExit: false,
    }
}