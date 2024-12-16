import { describe,it,expect} from "vitest";
import { isWeekendDay, getNumberOfDaysInMonth, createDaysForCurrentMonth,createDaysForNextMonth,
    createDaysForPreviousMonth, } from '../helpers'


describe('helper functions',()=>{
    // Test for isWeekendDay function 
    describe('isWeekendDay', () => {
        it('should return true for a Saturday or Sunday', () => {
          expect(isWeekendDay('2024-12-15')).toBe(true); 
          expect(isWeekendDay('2024-12-14')).toBe(true); 
        });
    
        it('should return false for weekdays', () => {
          expect(isWeekendDay('2024-12-13')).toBe(false); 
          expect(isWeekendDay('2024-12-11')).toBe(false); 
        });
    
        it('should handle invalid date input gracefully', () => {
          expect(isWeekendDay('invalid-date')).toBe(false);
        });
      });
    // Test for getNumberOfDaysInMonth function 
    describe('getNumberOfDaysInMonth', () => {
        it('should return 31 for December 2024', () => {
          expect(getNumberOfDaysInMonth(2024, 12)).toBe(31);
        });
    
        it('should return 29 for February 2024 (leap year)', () => {
          expect(getNumberOfDaysInMonth(2024, 2)).toBe(29);
        });
    
        it('should return 28 for February 2023 (non-leap year)', () => {
          expect(getNumberOfDaysInMonth(2023, 2)).toBe(28);
        });
      });
    // Test for createDaysForPreviousMonth function
    describe('createDaysForPreviousMonth',()=>{
        it('It should create the correct days for the previous month',()=>{
            const year=2024;
            const month=3;
            const currentMonthDays = createDaysForCurrentMonth(year, month);
            const previousMonthDays = createDaysForPreviousMonth(year, month, currentMonthDays);
            expect(previousMonthDays[0].dateString).toBe("2024-02-25"); 
            expect(previousMonthDays[0].isPreviousMonth).toBe(true);
            expect(previousMonthDays).toHaveLength(5)
        })
    })
    // Test for createDaysForNextMonth function
    describe('createDaysForNextMonth',()=>{
        it('should create the correct days for the next month',()=>{
            const year = 2024;
            const month = 3; 
            const currentMonthDays = createDaysForCurrentMonth(year, month);
            const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
            expect(nextMonthDays[0].dateString).toBe('2024-04-01');
            expect(nextMonthDays[0].isNextMonth).toBe(true)
            expect(nextMonthDays).toHaveLength(6); 
        })
    })

})








