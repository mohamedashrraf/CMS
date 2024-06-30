import type { Meta, StoryObj } from '@storybook/angular';

import { EmailInputComponent } from './email.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<EmailInputComponent> = {
    title: 'Inputs/InputEmail',
    component: EmailInputComponent,
};

export default meta;
type Story = StoryObj<EmailInputComponent>;

export const Input: Story = {
    args: {
        inp: '',
    },
};