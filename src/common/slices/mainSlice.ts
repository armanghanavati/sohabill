import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

type toastify = {
    title?: string;
    bg?: string;
    show?: boolean;
}

interface ShowQuestion {
    answer?: boolean,
    show?: boolean
};

type MessageModal = {
    title?: string,
    show?: boolean
}

interface ShowModal {
    showModal?: boolean;
    showModal2?: boolean;
    typeModal?: number;
    typeModal2?: number;
}

interface MainState {
    messageModal: MessageModal;
    showToast: toastify;
    showModal: ShowModal;
    showQuestionModal: ShowQuestion;
    showLoading?: { btnName?: string | number, value?: boolean };
    showLoadingBtn?: string
};

const initialState: MainState = {
    messageModal: { title: "", show: false },
    showToast: { title: "", bg: "", show: false },
    showModal: { showModal: false, typeModal: 0, showModal2: false, typeModal2: 0 },

    showQuestionModal: { show: false, answer: false },
    showLoading: { btnName: "", value: false },
    showLoadingBtn: "",
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        RsetMessageModal: (state, actions: PayloadAction<MessageModal>) => {
            return { ...state, messageModal: actions.payload }
        },
        RsetShowLoading: (state, actions: PayloadAction<{ btnName?: string | number, value?: boolean }>) => {
            return { ...state, showLoading: actions.payload }
        },
        RsetShowToast: (state, actions: PayloadAction<toastify>) => {
            return { ...state, showToast: actions.payload }
        },
        RsetShowModal: (state, actions: PayloadAction<ShowModal>) => {
            return { ...state, showModal: actions.payload }
        },
        RsetQuestionModal: (state, actions: PayloadAction<ShowQuestion>) => {
            return { ...state, showQuestionModal: actions.payload }
        },
        RsetShowLoadingBtn: (state, actions: PayloadAction<string>) => {
            return { ...state, showLoadingBtn: actions.payload }
        }
    },
    extraReducers: {}
});

export const {
    RsetShowLoadingBtn,
    RsetShowLoading,
    RsetQuestionModal,
    RsetMessageModal,
    RsetShowToast,
    RsetShowModal } = mainSlice.actions

export const selectShowToast = (state: RootState) => state.main.showToast;
export const selectQuseTionModal = (state: RootState) => state.main.showQuestionModal;
export default mainSlice.reducer;