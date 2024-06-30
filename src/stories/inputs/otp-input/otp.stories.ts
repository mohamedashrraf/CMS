import type { Meta, StoryObj } from '@storybook/angular';

import { OtpComponent } from './otp.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<OtpComponent> = {
    title: 'Inputs/otp',
    component: OtpComponent,
};

export default meta;
type Story = StoryObj<OtpComponent>;

export const Input: Story = {
    args: { },
};