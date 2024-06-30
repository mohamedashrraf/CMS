import type { Meta, StoryObj } from '@storybook/angular';

import { ToastSystemComponent } from './toast-system.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<ToastSystemComponent> = {
    title: 'toasts/system',
    component: ToastSystemComponent,
};

export default meta;
type Story = StoryObj<ToastSystemComponent>;

export const toastSystem: Story = {
    args: {
        label: 'Toggle Toast',
    },
};