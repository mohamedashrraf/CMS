import type { Meta, StoryObj } from '@storybook/angular';

import { InputComponent } from './input.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<InputComponent> = {
    title: 'Inputs/InputText',
    component: InputComponent,
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Input: Story = {
    args: {
        inp: '',
    },
};