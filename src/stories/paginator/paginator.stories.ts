import type { Meta, StoryObj } from '@storybook/angular';
import { PaginatorComponent } from './paginator.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<PaginatorComponent> = {
    title: 'Pagination/Paginator',
    component: PaginatorComponent,
};

export default meta;
type Story = StoryObj<PaginatorComponent>;

export const Paginator: Story = {
    args: {
        all: 10,
        active: 0,
        pages: 5
    },
};
