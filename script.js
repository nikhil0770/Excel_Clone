$(document).ready(function () {
  for (let i = 1; i <= 100; i++) {
    let ans = "";
    let n = i;

    while (n > 0) {
      let rem = n % 26;
      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem - 1 + 65) + ans;
        n = Math.floor(n / 26);
      }
    }

    let column = $(`<div class="column_name" id = "col${i}" >${ans}</div>`);
    $(".column_container").append(column);

    let row = $(`<div class="row-name" id = "row${i}">${i}</div>`);
    $(".row_container").append(row);
  }

  let input_cell_container = $(".input_cell_container");
  for (let i = 1; i <= 100; i++) {
    let cell_row = $(`<div class="cell-rows" id = "cell_row-${i}"></div>`);
    for (let j = 1; j <= 100; j++) {
      let cells = $(
        `<div class="row" id = "row-${i}-col-${j}" contenteditable="false"></div>`
      );
      cell_row.append(cells);
    }
    input_cell_container.append(cell_row);
  }

  $(".align_icon").click(function () {
    $(".align_icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".style_icon").click(function () {
    $(this).toggleClass("selected");
  });

  $(".row").click(function (e) {
    //console.log(e);
    $(this).addClass("selected");
    if (e.ctrlKey) {
      let [rowId, colId] = getrowcol(this);
      if (rowId > 1) {
        let top_cell = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
        if (top_cell) {
          $(this).addClass("top_selected");
          $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom_selected");
        }
      }

      if (rowId < 100) {
        let bottom_cell = $(`#row-${rowId + 1}-col-${colId}`).hasClass(
          "selected"
        );
        if (bottom_cell) {
          $(this).addClass("bottom_selected");
          $(`#row-${rowId + 1}-col-${colId}`).addClass("top_selected");
        }
      }
      //left
      if (colId > 1) {
        let left_cell = $(`#row-${rowId}-col-${colId - 1}`).hasClass(
          "selected"
        );
        if (left_cell) {
          $(this).addClass("left_selected");
          $(`#row-${rowId}-col-${colId - 1}`).addClass("right_selected");
        }
      }
      if (colId < 100) {
        let right_cell = $(`#row-${rowId}-col-${colId + 1}`).hasClass(
          "selected"
        );
        if (right_cell) {
          $(this).addClass("right_selected");
          $(`#row-${rowId}-col-${colId + 1}`).addClass("left_selected");
        }
      }
    } else {
      $(".row.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });

  $(".row").dblclick(function () {
    $(".row.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus();
  });

  $(".row").blur(function () {
    $(".row.selected").attr("contenteditable", "false");
  });
  $(".input_cell_container").scroll(function () {
    $(".column_container").scrollLeft(this.scrollLeft);
    $(".row_container").scrollTop(this.scrollTop);
  });

  $(".item_bold").click(function () {
    if (!$(this).hasClass("selected")) {
      update_property("font-weight", "");
    } else {
      update_property("font-weight", "bold");
    }
  });
  $(".item_italic").click(function () {
    if (!$(this).hasClass("selected")) {
      update_property("font-style", "");
    } else {
      update_property("font-style", "italic");
    }
  });
  $(".item_underline").click(function () {
    if (!$(this).hasClass("selected")) {
      update_property("text-decoration", "none");
    } else {
      update_property("text-decoration", "underline");
    }
  });
});

function getrowcol(ele) {
  let arr = $(ele).attr("id").split("-");
  return [parseInt(arr[1]), parseInt(arr[3])];
}

function update_property(property, value) {
  $(".row.selected").each(function () {
    $(this).css(property, value);
  });
}
