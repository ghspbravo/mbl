import { createReducer } from 'redux-create-reducer';

export type citiesList = {
  id: number, name: string
}[]
export interface commonState {
  currentCityId: number,
  cities: citiesList
}

const initialState: commonState = {
  cities: [
    { id: 0, name: 'Екатеринбург' },
    { id: 1, name: 'Москва' },
    { id: 2, name: 'Санкт-Петербург' },
    { id: 3, name: 'Московская область и регионы' },
  ],
  currentCityId: 0,
}

const commonReducer = createReducer(initialState, {

})


export default commonReducer;