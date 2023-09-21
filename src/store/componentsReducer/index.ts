import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getNextComponentId } from './utils';
import reduce from 'immer';
export type ComponentInfoType = {
  fe_id: string;
  title: string;
  type: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: object;
};
export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};
const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
};
export const componentsReducer = createSlice({
  name: 'component',
  initialState: INIT_STATE,
  reducers: {
    addComponent: reduce(
      (draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
        const { selectedId, componentList } = draft;
        const newComponent = action.payload;
        const index = componentList.findIndex(
          (component) => component.fe_id === selectedId,
        );

        if (index < 0) {
          componentList.push(newComponent);
        } else {
          componentList.splice(index + 1, 0, newComponent);
        }
      },
    ),
    // 删除当前选中的组件，delete热键
    removeSelectedComponent: reduce((draft: ComponentStateType) => {
      const { selectedId: removedId, componentList = [] } = draft;
      const index = componentList.findIndex(
        (component) => component.fe_id === removedId,
      );
      draft.selectedId = getNextComponentId(removedId, componentList);
      componentList.splice(index, 1);
    }),

    selectPrevComponent: (draft: ComponentStateType) => {
      const { componentList, selectedId } = draft;
      const index = componentList.findIndex(
        (component) => component.fe_id === selectedId,
      );
      // 未选中或者选中第一个数据，不能再往前
      if (index <= 0) {
        return;
      }
      draft.selectedId = componentList[index - 1].fe_id;
    },

    selectNextComponent: (draft: ComponentStateType) => {
      const { componentList, selectedId } = draft;
      const index = componentList.findIndex(
        (component) => component.fe_id === selectedId,
      );
      // 未选中
      if (index < 0) return;
      // 最后一个组件
      if (index + 1 === componentList.length) return;
      draft.selectedId = componentList[index + 1].fe_id;
    },
  },
});

export const { removeSelectedComponent } = componentsReducer.actions;

export default componentsReducer.reducer;
