import type { Meta, StoryObj } from '@storybook/angular';
import { CardModalComponent } from './card-modal.component';


const meta: Meta<CardModalComponent> = {
    title: 'Confirmation Popup/Card',
    component: CardModalComponent,
};

export default meta;
type Story = StoryObj<CardModalComponent>;

export const deleteAccountCardModal: Story = {
    args: {
        title: 'Are you sure to delete the account?',
        description: 'Lorem ipsum is placeholder text commonly ipsum is placeholde commonly',
        icon_path: 'delete_icon.svg',
        backgroundImg: 'ellipse.svg',
        cancel: 'Cancel',
        action: 'Delete Account',
        actionBackground: 'rgba(241, 65, 108, 1)'
    },
};


export const addNewUserCardModal: Story = {
    args: {
        title: 'Are you sure to Add the account?',
        description: 'Lorem ipsum is placeholder text commonly ipsum is placeholde commonly',
        icon_path: 'add_icon.svg',
        backgroundImg: 'ellipse-blue.svg',
        cancel: 'Cancel',
        action: 'Add Account',
        actionBackground: '#0660FC'
    },
};


export const unSavedChangesCardModal: Story = {
    args: {
        title: 'Unsaved Changes',
        description: 'Do you want to save or discard changes ?',
        icon_path: 'ellipse-yellow.svg',
        backgroundImg: 'background-ellipse.svg',
        cancel: 'Cancel',
        action: 'Save Changes',
        actionBackground: '#0660FC'
    },
};