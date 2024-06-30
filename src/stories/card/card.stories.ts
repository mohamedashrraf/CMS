import type { Meta, StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<CardComponent> = {
    title: 'Cards/Card',
    component: CardComponent,
};

export default meta;
type Story = StoryObj<CardComponent>;

export const userManagementCard: Story = {
    args: {
        title: 'Active Users',
        description: 'Total user number',
        description_continue: 'in this system',
        icon_path: 'user-management-count.svg',
        total_number: '3500'
    },
};