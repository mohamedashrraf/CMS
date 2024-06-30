import type { Meta, StoryObj } from '@storybook/angular';

import { AuthButtonComponent } from './authButton.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<AuthButtonComponent> = {
    title: 'buttons/authButton',
    component: AuthButtonComponent,
};

export default meta;
type Story = StoryObj<AuthButtonComponent>;

export const authButton: Story = {
    args: {
        label: 'Sign up',
    },
};