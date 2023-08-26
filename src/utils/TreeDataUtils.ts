import _ from "lodash";

const mapListDataToTree = (list: any[] = []) => {
    const map: any = {};
    let node: any = {};
    const roots = [];
    let i = 0;
    try {
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            // if (node.parent_id && list[map[node.parent_id]]) {
            if (node.parent_id) {
                // if you have dangling branches check that map[node.parentId] exists
                if (!list[map[node.parent_id]]) {
                    // eslint-disable-next-line no-throw-literal
                    throw `dont have Parent NODE (${node.parent_id}) of nodeid ${node.id}`;
                }
                list[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
    } catch (err) {
        console.log(err);
    }

    return roots;
};

const getAllSiblings = (nodeId: string, dataList: any[] = []) => {
    const currentNode = dataList.find((item) => item.id === nodeId);
    let allSibling = [];
    if (currentNode.parent_id) {
        allSibling = dataList.filter((item) => item.parent_id && item.parent_id === currentNode.parent_id);
    } else {
        allSibling = dataList.filter((item) => !item.parent_id);
    }
    return _.sortBy(allSibling, (item) => item.priority);
};

const getAllSiblingCategory = (nodeId: string, dataList: any[] = []) => {
    const currentNode = dataList.find((item) => item.id === nodeId);
    let allSibling = [];
    if (currentNode.parent_id) {
        allSibling = dataList.filter((item) => item.parent_id && item.parent_id === currentNode.parent_id);
    } else {
        allSibling = dataList.filter((item) => !item.parent_id);
    }
    return _.sortBy(allSibling, (item) => item.position);
};

const getAllChild = (nodeId: string, dataList: any[] = []) => {
    const childNodes = dataList.filter((item) => item.parent_id === nodeId);
    return _.sortBy(childNodes, (item) => item.priority);
};

const getAllChildCategory = (nodeId: string, dataList: any[] = []) => {
    const childNodes = dataList.filter((item) => item?.parent_id === nodeId);
    return _.sortBy(childNodes, (item) => item.position);
};

const isLeafNode = (nodeId: string, dataList: any[] = []) => {
    const children = getAllChild(nodeId, dataList);
    return children.length === 0;
};

const isRootNode = (nodeId: string, dataList: any[] = []) => {
    const currentNode: any = dataList.filter((item) => item.id === nodeId);
    return !currentNode.parent_id;
};

const getAllChildAndSubChild = (nodeId: string, dataList: any[] = []) => {
    const childNodes = dataList.filter((item) => item?.parent_id === nodeId);
    if (_.isEmpty(childNodes)) {
        return [];
    }
    let result = [...childNodes];
    childNodes.forEach((item) => {
        const subChildNode = getAllChildAndSubChild(item?.id, dataList);
        if (!_.isEmpty(subChildNode)) {
            result = [...result, ...subChildNode];
        }
    });
    return result;
};

const searchNode = (findId: string, checkNode: any, getId = (node: any) => node?.id): any => {
    if (findId === getId(checkNode)) {
        return checkNode;
    }
    if (checkNode?.children?.length > 0) {
        let result = null;
        let i;
        // eslint-disable-next-line no-plusplus
        for (i = 0; result == null && i < checkNode.children.length; i++) {
            result = searchNode(findId, checkNode?.children?.[i], getId);
        }
        return result;
    }
    return null;
};

const searchNodeFromTreeList = (nodeId: string, treeList = [], getId?: any) => {
    let i;
    let result = null;
    // eslint-disable-next-line no-plusplus
    for (i = 0; result == null && i < treeList.length; i++) {
        result = searchNode(nodeId, treeList[i], getId);
    }
    return result;
};

const getLevel = (obj: any) => {
    let depth = 0;
    if (obj.children) {
        obj.children.forEach((d: any) => {
            const tmpDepth = getLevel(d);
            if (tmpDepth > depth) {
                depth = tmpDepth;
            }
        });
    }
    return 1 + depth;
};

const getLevelOfNode = (nodeId: string, treeList = []) => {
    const nodeItem = searchNodeFromTreeList(nodeId, treeList);
    return getLevel(nodeItem);
};

export default {
    getAllSiblings,
    getAllChild,
    isLeafNode,
    isRootNode,
    mapListDataToTree,
    getAllSiblingCategory,
    getAllChildCategory,
    getAllChildAndSubChild,
    getLevelOfNode,
    searchNodeFromTreeList,
};
