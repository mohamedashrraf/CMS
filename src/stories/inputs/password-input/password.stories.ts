import type { Meta, StoryObj } from '@storybook/angular';

import { PasswordInputComponent } from './password.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<PasswordInputComponent> = {
    title: 'Inputs/InputPassword',
    component: PasswordInputComponent,
};

export default meta;
type Story = StoryObj<PasswordInputComponent>;

export const Input: Story = {
    args: {
        inp: '',
    },
};