import type { Meta, StoryObj } from '@storybook/angular';

import { AuthSliderComponent } from './authslide.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<AuthSliderComponent> = {
    title: 'sliders/authSlider',
    component: AuthSliderComponent,
};

export default meta;
type Story = StoryObj<AuthSliderComponent>;

export const authSlider: Story = {
    args: {
        slides: [
            'illustration-signup.png',
            'second-signup-img.svg',
        ],
    },
};