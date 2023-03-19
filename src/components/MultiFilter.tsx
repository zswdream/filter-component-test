// filter component
import { SetStateAction } from 'react';
import { MultiFilterType, FilterType, CurrentType } from '../types/MultifilterTypes';
import MultiSelect from './MultiSelect';

interface props {
  filters: MultiFilterType;
  updateFilter: (value: SetStateAction<MultiFilterType>) => void;
}

const MultiFilter: React.FC<props>  = ({ filters, updateFilter }: props) => {
  const addFilter = () => {
    return {
      ...filters,
      current: [...(filters.current as [] || []), { type: '', name: '', value: '' }]
    };
  }

  const removeFilter = () => {
    const newFilters = filters.current;
    newFilters?.pop();
    return {
      ...filters,
      current: newFilters
    };
  }

  const availableFilters = () => {
    const available = filters.filters.filter((filter: FilterType) => {
      return !filters.current?.some((current: CurrentType) => {
        return current.name === filter.name;
      });
    })

    return available;
  }

  const inputSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = filters.filters.find((filter: FilterType) => {
      return filter.name === e.target.value;
    })
  
    const newCurrent = [...(filters.current as CurrentType[])];
    
    Object.assign(newCurrent[newCurrent.length - 1], { type: selectedFilter?.type, name: selectedFilter?.name, value: '' });
    updateFilter({
      ...filters,
      current: newCurrent
    });
  }

  const inputType = (current: CurrentType) => {
    switch (current.type) {
      case 'multi-select':
        return <MultiSelect options={MultiSelectOptions(current.name)} onChange={updateFilterVal}/>
      case 'date-range':
        return <input type="date" onChange={updateFilterVal}/>
      case 'num-range':
        return <input type="number" onChange={updateFilterVal}/>
      default:
        return <input/>
    }
  }

  const updateFilterVal = (e: React.ChangeEvent<HTMLInputElement> | string[]) => {
    const updatedVal = Array.isArray(e) ? e : e.target.value;
    const newCurrent = [...(filters.current as CurrentType[])];
    Object.assign(newCurrent[newCurrent.length - 1], { value: updatedVal });
    updateFilter({
      ...filters,
      current: newCurrent
    });
  }

  const MultiSelectOptions = (current: string | undefined) => {
    const selectedFilter = filters.filters.find((filter: FilterType) => {
      return filter.name === current;
    })
    return selectedFilter?.options || [];
  }

  const Addbutton = (): JSX.Element | null => {
    const currentData = Array.isArray(filters.current) ? filters.current : []
    if (currentData?.length === filters.filters.length) return null;
    return (
      <button
        disabled={
          (currentData[currentData.length - 1] as CurrentType)?.type === ""
          && currentData.length > 0
        }
        onClick={() => updateFilter(addFilter())}
      >+</button>
    )
  }

  return (
    <>
      <div className="display-flex">
        {filters.current && filters.current.map((current: CurrentType, idx: number) => {
          return (
            <div className="display-flex" key={idx}>
              <select onChange={inputSelected} value={current?.name || 'none'}>
                <option value="none">Select Filter</option>
                {
                  availableFilters().map((filter: FilterType, idx: number) => {
                    return (
                      <option key={idx} value={filter.name}>{filter.name}</option>
                    )
                  })
                }
                {
                  current.name !== '' && <option key={idx} value={current.name}>{current.name}</option>
                }
              </select>
              { inputType(current) }
            </div>
          )
        })}
        {filters?.current && filters.current.length > 0
        && <button onClick={() => updateFilter(removeFilter())}>-</button>}
        
        {<Addbutton />}
      </div>
    </>
  );
};

export default MultiFilter;

