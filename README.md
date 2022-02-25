# TIME TRACKING APP

- https://stackoverflow.com/questions/62162645/change-color-of-chromes-calendar-icon-in-html-date-input

```jsx
<input type='date' className='input [color-scheme:dark]' />
```

- https://stackoverflow.com/questions/63934766/react-datepicker-calendar-not-closing-on-selection-of-date

  wrap `DatePicker` component inside label like this break it somehow 😢😢😢, just change that to
  `div`

```jsx
<label className='block'>
  Day
  <DatePicker date={date} setDate={setDate} />
</label>
```
