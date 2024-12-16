import { describe,it,except,vi } from "vitest";
import { render,screen,fireEvent } from "@testing-library/react";
import Calendar,{CalendarDayHeader} from "../calendar";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

// Test Calander Component 
describe('Calander',()=>{
      const yearAndMonth =[2024,12]
      // Test for checking if specific Virtual Dom Element is existing
      it('It only renders correctly with give porps',()=>{
           render(<Calendar yearAndMonth={yearAndMonth} onYearAndMonthChange={vi.fn()}/>)
           except(screen.getByText('2024年12月')).toBeInTheDocument();
           expect(screen.getByText('Sun')).toBeInTheDocument();
           expect(screen.getByText('⭠')).toBeInTheDocument();
           expect(screen.getByText('⭢')).toBeInTheDocument();
      })
      // Test for checking if onYearAndMonthChange prop working correctly
      it('It calls onYearAndMonthChange correctly when clickt back and forth buttons',()=>{
            const onYearAndMonthChange = vi.fn();
            render(<Calendar yearAndMonth={yearAndMonth}  onYearAndMonthChange={onYearAndMonthChange}/>)
            fireEvent.click(screen.getByText('⭠'));
            except(onYearAndMonthChange).toHaveBeenCalledWith([2024, 11]);
            fireEvent.click(screen.getByText('⭢'))
            except(onYearAndMonthChange).toHaveBeenCalledWith([2025,1]);
      })  
})
// Test CalendarDayHeader Component
describe('CalendarDayHeader',()=>{
       it('It render day header correctly',()=>{
            const calendarDayObject = { dayOfMonth: 15 };
            render(<CalendarDayHeader calendarDayObject={calendarDayObject}/>)
            except(screen.getByText('15')).toBeInTheDocument()
            expect(screen.getByText('15')).toHaveClass('day-grid-item-header');
       })
})