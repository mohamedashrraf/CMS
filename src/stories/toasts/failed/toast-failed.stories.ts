import type { Meta, StoryObj } from '@storybook/angular';

import { ToastFailedComponent } from './toast-failed.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<ToastFailedComponent> = {
    title: 'toasts/failed',
    component: ToastFailedComponent,
};

export default meta;
type Story = StoryObj<ToastFailedComponent>;

export const toastFailed: Story = {
    args: {
        label: 'Toggle Toast',
    },
};