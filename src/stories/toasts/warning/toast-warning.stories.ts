import type { Meta, StoryObj } from '@storybook/angular';

import { ToastWarningComponent } from './toast-warning.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<ToastWarningComponent> = {
    title: 'toasts/warning',
    component: ToastWarningComponent,
};

export default meta;
type Story = StoryObj<ToastWarningComponent>;

export const toastWarning: Story = {
    args: {
        label: 'Toggle Toast',
    },
};