import type { Meta, StoryObj } from '@storybook/angular';

import { ToastSuccessComponent } from './toast-success.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<ToastSuccessComponent> = {
    title: 'toasts/success',
    component: ToastSuccessComponent,
};

export default meta;
type Story = StoryObj<ToastSuccessComponent>;

export const toastSuccess: Story = {
    args: {
        label: 'Toggle Toast',
    },
};