import json1 from '../../resources/dataset/restaurants_info.json'
import json2 from '../../resources/dataset/restaurants_list.json'

export const sortedInfo = json1.sort((a, b) => parseInt(a.objectID) > parseInt(b.objectID) ? 1 : -1);
export const sortedList = json2.sort((a, b) => a.objectID > b.objectID ? 1 : -1);

for(var i = 0; i < sortedInfo.length; i++) {
  if(parseInt(sortedInfo[i].objectID) === sortedList[i].objectID) {
    sortedInfo[i] = Object.assign(sortedInfo[i], sortedList[i]);
  }
}

export const combinedList = sortedInfo;
