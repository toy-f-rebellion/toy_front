import { createReducer, createAction } from '@reduxjs/toolkit';
import { useState, useEffect, useContext } from 'react';
import { firestore } from '../../firebase';
import axios from 'axios';

const db = firestore.collection('schedule');

export const initialState = {
  fullSchedule: [],
  thisMonthSchedule: [],
  thisMonth: [],
  isOpenEditPopup: false,
  currentSchedule: null,
  isFilter: false
};

export const fetchFullSchedule = createAction('FETCH_FULL_SCHEDULE');
export const addSchedule = createAction('ADD_SCHEDULE');
export const editSchedule = createAction('EDIT_SCHEDULE');
export const removeSchedule = createAction('REMOVE_SCHEDULE');
export const filterThisMonth = createAction('FILTER_THIS_MONTH');
export const openEditPopup = createAction('OPEN_EDIT_POPUP');
export const setCurrentSchedule = createAction('SET_CURRENT_SCHEDULE');
export const setIsFilter = createAction('SET_IS_FILITER');

const schedule = createReducer(initialState, {

  [fetchFullSchedule]: (state, { payload }) => {
    state.fullSchedule = payload.fullList;
    state.thisMonthSchedule = payload.thisMonthSchedule;

    // 완료된 것들만 선택적으로 보여주는 필터 기능을 수행
    if (state.isFilter) {
      state.thisMonth = state.thisMonthSchedule.filter((sc) => {
        return sc.completed === true;
      });
    } else {
      console.log('gg');
      state.thisMonth = state.thisMonthSchedule;
    }
  },
  [openEditPopup]: (state, { payload }) => {
    state.isOpenEditPopup = payload.isOpen;
    state.currentSchedule = payload.schedule;
  },
  [addSchedule]: (state, { payload }) => {
    console.log('스케줄생성');
    state.fullSchedule.push(payload);
    if (!state.isFilter) {
        state.thisMonth.push(payload);
    }
    else {
      console.log('스케줄생성실패');
    }
  },
  [setIsFilter]: (state, { payload }) => {
    state.isFilter = payload;
  },
  [editSchedule]: (state, { payload }) => {
    const fullIdx = state.fullSchedule.findIndex((s) => s.id === payload.id);
    state.fullSchedule.splice(fullIdx, 1, payload);

    const monthIdx = state.thisMonth.findIndex((s) => s.id === payload.id);
    if (monthIdx !== -1) {
        state.thisMonth.splice(monthIdx, 1, payload);
    }

    state.currentSchedule = payload;
  },
  [removeSchedule]: (state, { payload }) => {
    const fullIdx = state.fullSchedule.findIndex((s) => s.id === payload.id);
    state.fullSchedule.splice(fullIdx, 1);

    const monthIdx = state.thisMonth.findIndex((s) => s.id === payload.id);
    if (monthIdx !== -1) {
        state.thisMonth.splice(monthIdx, 1);
    }

    state.currentSchedule = null;
  },

  [filterThisMonth]: (state, { payload }) => {
    state.thisMonth = state.fullSchedule.filter((sc, idx) => {
      if (state.isFilter) {
        return (
          parseInt(sc.date) >= parseInt(payload.startDay) &&
          parseInt(sc.date) <= parseInt(payload.endDay) &&
          sc.completed === true
        );
      } else {
        return (
          parseInt(sc.date) >= parseInt(payload.startDay) &&
          parseInt(sc.date) <= parseInt(payload.endDay)
        );
      }
    });
  }
});

// thunk

export const createSchedule = (data, token) => {
  return async(dispatch) => {
    const saveData = { ...data, completed: false };
    db.add(saveData).then((docRef) => {
      console.log("Document reference:", docRef);
      let schedule = { ...saveData, id: docRef.id };
      dispatch(addSchedule(schedule));
    })
    .catch((error) => {
      console.error("Error adding schedule:", error);
    });

    // try {
    //   let saveData ={ ...data, completed:false };
    //   const response = await axios.post('http://13.209.16.226:8080/api/diary/create', saveData,{
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   let schedule={...saveData,id : response.data.id};
    //   dispatch(addSchedule(schedule));
    // } catch(error){
    //   console.error("Error adding schedule:", error);
    // }
  };
};

export const readSchedule = ({ startDay, endDay }) => {
  return async(dispatch) => {
    db.get().then((docs) => {
      let fullList = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          let schedule = { ...doc.data(), id: doc.id };
          fullList.push(schedule);
        }
      });


    // let fullList, thisMonthSchedule = []; 
    // let fullList = [{
    //   "addDate": "2023-09-01",
    //   "diaryDetail": "제발 나의 응답에 답해줘 ㅜㅜ",
    //   "emotion": "기쁨"}];
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2UzMzExQGVtYWlsLmNvbSIsImlhdCI6MTY5Mzg4Mzg5OCwiZXhwIjoxNjkzODg3NDk4fQ.JSiHfSYUbhF1ucfZj8pFOM5rEF6BEL4_c1wqZN0ojs8MmCAnVMteRKNpotdK0tvpqo3JvZrRyv7j3TfRP5CRIg';
    //   try {
    //     const response = await axios.get('http://13.209.16.226:8080/api/diary/view?addDate=2023-09-01', {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   fullList = response.data;

    //   thisMonthSchedule = fullList.filter((sc, idx) => {
    //     return (
    //       parseInt(sc.date) >= parseInt(startDay) &&
    //       parseInt(sc.date) <= parseInt(endDay)
    //     );
    //   });
      
    //   console.log(fullList);
    //   console.log(thisMonthSchedule);
    // } catch(error){
    //   console.error("Error fetching data:", error);
    // }


    // axios.get('http://13.209.16.226:8080/api/diary/view')
    // .then((response) => {
    //   let fullList = response.data;

      const thisMonthSchedule = fullList.filter((sc, idx) => {
        return (
          parseInt(sc.date) >= parseInt(startDay) &&
          parseInt(sc.date) <= parseInt(endDay)
        );
      });

      dispatch(fetchFullSchedule({ fullList, thisMonthSchedule }));
      // dispatch(fetchFullSchedule({ fullList }));
    });
  };
};

export const updateSchedule = (data) => {
  return (dispatch) => {
    db.doc(data.id)
      .update(data)
      .then((docRef) => {
        dispatch(editSchedule(data));
      });
    // axios.put(`/api/schedule/${data.id}`, data)
    // .then(() => {
    //   dispatch(editSchedule(data));
    // });
  };
};

export const deleteSchedule = (id) => {
  return (dispatch) => {
    db.doc(id)
      .delete()
      .then(() => {
        dispatch(removeSchedule(id));
      })
      .catch((err) => {
        console.log(err);
      });
  //   axios.delete(`/api/schedule/${id}`)
  //   .then(() => {
  //     dispatch(removeSchedule(id));
  //   })
  //   .catch((err) => { 
  //     console.log(err);
  //  });
  };
};

export default schedule;