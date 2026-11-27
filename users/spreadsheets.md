---
sidebar_position: 10
title: Spreadsheets
---
# Spreadsheets

Create a spreadsheet with **New spreadsheet** on Home or in Files under
**New**. Several people can work in it at once; their avatars show at the top
right, and everything below reaches them as you do it.

![A spreadsheet with a frozen, filtered heading row, checkboxes and conditional formatting](/img/users/sheets-editor.png)

## Enter data

Click a cell and type. Press Enter to move down, Tab to move right, and Esc to
cancel. The formula bar above the grid (**fx**) shows the selected cell's
address and its contents, and you can edit there too.

Formulas start with `=`, for example `=B2*C2` or `=SUM(D2:D6)`.

## Menus and toolbar

The menus under the title (**File**, **Edit**, **View**, **Insert**,
**Format**, **Data**, **Tools**, **Help**) hold everything the spreadsheet can
do, with keyboard shortcuts shown beside each item. Use the arrow keys to move
through them once one is open. To find an item by name, press **Alt+/**
(**⌥/** on a Mac) or choose **Help** > **Search the menus**, type part of its
name, and press Enter.

The toolbar keeps the everyday formatting: **Undo**, **Redo**,
**Paint format**, the number format, the font and its size, **Bold**,
**Italic**, **Underline**, **Strikethrough**, **Text colour**, **Fill colour**,
**Borders**, **Merge cells**, alignment, **Vertical align**,
**Text wrapping**, **Insert chart** and **Create a filter**.

## Format

- **Format** > **Number** sets how numbers show: **Number**, **Percent**,
  **Euro**, **Date**, **Time** and others.
- **Format** > **Font** and **Font size** change the lettering. A row grows to
  fit larger or wrapped text.
- **Format** > **Wrapping**: **Overflow** lets long text run into empty cells
  to its right, **Wrap** breaks it into lines inside the cell, **Clip** cuts it
  off at the cell's edge.
- **Format** > **Alignment** has left, centre and right, and top, middle and
  bottom.
- **Paint format** copies the formatting of the selected cells: click it, then
  select the cells to format. Press Esc to stop.
- **Format** > **Column width…** and **Row height…** set sizes in pixels or
  fit them to the data. You can also drag the edge of a column or row heading,
  or double-click it to fit.
- **Format** > **Clear formatting** (Ctrl+\\ or ⌘\\) puts cells back to
  plain.

## Freeze rows and columns

**View** > **Freeze** keeps the first rows or columns in view while you
scroll: **1 row**, **2 rows**, **Up to row** of the selected cell, and the same
for columns. **No rows** and **No columns** unfreeze them.

## Sort

- **Data** > **Sort sheet by column … A → Z** (or **Z → A**) sorts every row
  of data by the selected cell's column. Frozen rows stay where they are, as
  headings.
- **Data** > **Sort range** sorts only the selected cells;
  **Advanced sort options…** lets you say the range has a header row and sort
  by several columns.

Rows move with their formatting, and formulas adjust as they would if the
rows had been copied. One **Undo** puts everything back.

## Filter

Select a cell in your data and click **Create a filter** (or **Data** >
**Create a filter**, Ctrl+Shift+F). Each heading gets a button. Click it to:

- sort the data by that column,
- filter by condition, such as **Greater than** or **Text contains**,
- filter by values: untick the values to hide.

![The filter menu of a column](/img/users/sheets-filter.png)

A filter changes the sheet for everyone. Rows it hides are skipped when you
move with the arrow keys, and rows typed straight under the data are filtered
too. Click the filter button on the toolbar again to remove the filter.

### Filter views

A filter view filters the sheet for you only. Choose **Data** >
**Filter views** > **Create new filter view**. A green bar shows the view's
name, which you can change; filter the columns as above. Everyone else keeps
seeing the whole sheet. The bar's link button copies a link that opens the
view for whoever follows it, and **Close filter view** returns to the shared
sheet. Saved views are listed under **Data** > **Filter views**.

![The Data menu](/img/users/sheets-data-menu.png)

## Conditional formatting

**Format** > **Conditional formatting** colours cells that meet a condition.
Choose the range, a condition (such as **Greater than**, **Is between**,
**Text contains**, **Is empty** or **Is a duplicate**), and the formatting:
bold, italic, strikethrough, text colour and fill colour. **Colour scale**
shades numbers from the lowest to the highest, with an optional midpoint.

![Amounts over 50 in green, and the Conditional formatting panel](/img/users/sheets-conditional.png)

The panel lists the sheet's rules; edit or delete them there.

## Dropdowns, checkboxes and data validation

- **Insert** > **Checkbox** turns the selected cells into checkboxes. Click
  one, or press Space, to tick it; the cell holds TRUE or FALSE.
- **Insert** > **Dropdown** gives the selected cells a list to choose from and
  opens **Data validation** to set the items. Click the arrow in a cell, or
  press Alt+↓, to choose.
- **Data** > **Data validation** sets what a range accepts: a list of items, the
  values in another range, checkboxes, numbers (between, greater than…) or text
  (contains, is exactly). **Reject the input** refuses anything else and says
  why; **Show a warning** accepts it and marks the cell with a red corner.

## Pivot tables

A pivot table summarises data, such as total sales by region.

1. Select a cell in your data (its first row should be the headings).
2. Choose **Insert** > **Pivot table** and click **Create**. The table goes on
   a new sheet.
3. In the **Pivot table** panel, add fields to **Rows** and, optionally, one
   to **Columns**; add **Values** and choose **Sum**, **Count**, **Average**,
   **Min** or **Max**; and use **Filters** to leave values out.

![A pivot table of amounts by region](/img/users/sheets-pivot.png)

The totals follow the data as it changes, and new rows typed under the data
appear in the table. Open the pivot table's sheet to edit it again;
**Delete pivot table** removes it and its sheet.

## Find and replace

**Edit** > **Find and replace** (Ctrl+H or ⌘H) searches all sheets or this
one, with **Match case**, **Match entire cell contents**,
**Search using regular expressions** and **Also search within formulas**.
**Find** selects the next match; **Replace** and **Replace all** change them.
Ctrl+F (⌘F) opens the same search without replacing.

## Sheets

The tabs at the bottom are the workbook's sheets. Click **+** (**Add sheet**)
for a new one. Click the current tab for **Rename** and **Delete sheet**.

## Charts

1. Select the cells to chart, including the header row and label column.
2. Click **Insert chart** on the toolbar (or **Insert** > **Chart**).
3. In the **Chart** panel, choose **Column**, **Bar**, **Line**, **Area**,
   **Pie** or **Scatter**.

![A column chart and the Chart panel](/img/users/sheets-chart.png)

In the panel you can also change the **Data range** (type it, or select cells
and click the target button, **Use the selected cells**), tick
**First row is headers**, **First column is labels** or
**Switch rows and columns**, add a **Title** and axis titles, place the
**Legend**, **Stack the series** and **Show values**. **Delete chart**
removes it.

Drag a chart to move it and drag its handles to resize it. Double-click it to
open the panel again.

## Version history

Choose **File** > **Version history**. It works as in
[documents](./documents.md#version-history): view a version, **Restore this
version**, or **Name this version**.

## Import and export

- **File** > **Download** > **Microsoft Excel (.xlsx)** downloads the workbook
  with its formatting, frozen rows, filter, conditional formatting and data
  validation. Charts, filter views and text clipping are not included; a pivot
  table arrives as its values and formulas.
- **File** > **Download** > **Comma-separated values** downloads the open
  sheet as CSV.
- To bring in an Excel (`.xlsx`) or CSV file, use **New** >
  **Import Word, Excel or Markdown** in Files, or **Open as spreadsheet** on an
  uploaded file. Filters, conditional formatting and data validation in an
  Excel file come in too.

## Offline

A spreadsheet you have open keeps working if the connection drops; the label
says **Offline · saved on this device** and changes are sent when you are back.
Spreadsheets you have not opened in this session cannot be edited offline.
