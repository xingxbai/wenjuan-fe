import { ComponentInfoType } from './index';
export function getNextComponentId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  const visibleComponentList = componentList.filter(
    (component) => !component.isHidden,
  );
  const index = visibleComponentList.findIndex(
    (component) => component.fe_id === fe_id,
  );
  if (index < 0) return '';

  let newSelectedId = '';
  const length = visibleComponentList.length;
  // 组件长度就一个，被删除了，就没有组件
  if (length <= 1) {
    newSelectedId = '';
  } else {
    // 如果删除的是最后一条，selectedId是上一条
    if (length === index + 1) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
