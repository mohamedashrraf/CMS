import type { Meta, StoryObj } from '@storybook/angular';
import { AddButtonComponent } from './add-button.component';

//👇 This default export determines where your story goes in the story list
const meta: Meta<AddButtonComponent> = {
  title: 'buttons/AddButton',
  component: AddButtonComponent,
};

export default meta;
type Story = StoryObj<AddButtonComponent>;

export const addUser: Story = {
  args: {
    btnIcon: 'add-circle.svg',
    btnName: 'Add Post',
  },
};
