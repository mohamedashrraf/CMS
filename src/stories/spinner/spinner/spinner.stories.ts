import type { Meta, StoryObj } from '@storybook/angular';

import { SpinnerComponent } from './spinner.component';

const meta: Meta<SpinnerComponent> = {
    title: 'Spinners/Spinner',
    component: SpinnerComponent,
};

export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Spinner: Story = {
    args: {
        backgroundColor: 'rgba(6, 96, 252, 1)'
    },
};