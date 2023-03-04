"use strict";
// thao tác với localStorage
//
const getLocalStorage = (key) => {
  if (localStorage.getItem(key) || localStorage.getItem(key) === "") {
    console.log("local: ", localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
//

let crudSV = document.forms["crudSV"];
let render = document.getElementsByClassName("render");

let dsSV = getLocalStorage("listSinhVien") ?? [];
// render ngay tu dau
createTable();
renderListSinhVien(dsSV);

class SinhVien {
  constructor(MaSV, TenSV, NgaySinh, GioiTinh, Khoa) {
    this.MaSV = MaSV;
    this.TenSV = TenSV;
    this.NgaySinh = NgaySinh;
    this.GioiTinh = GioiTinh;
    this.Khoa = Khoa;
  }
}
class DanhsachSV {
  constructor(listSinhVien) {
    // super()
    this.listSinhVien = listSinhVien;
  }
  getListSinhVien() {
    return this.listSinhVien;
  }
  themSinhVien(sinhvien) {
    if (sinhvien instanceof SinhVien) {
      this.listSinhVien.push(sinhvien);
      console.log("danh sách sinh viên mới cập nhật: ", this.listSinhVien);
    } else console.log("sinhvien khong phai SinhVien", sinhvien);
  }
  timSinhVien(MaSV) {
    let sv = new SinhVien();
    let kt = false;
    for (const sinhvien of this.listSinhVien) {
      if (sinhvien.MaSV === MaSV) {
        kt = true;
        return sinhvien;
      }
    }
    if (kt) console.log("Có tồn tại sinh viên: ", sv);
    else console.log("không tồn tại sinh viên có mã sinh viên: ", MaSV);
    return sv;
  }
  xoaSinhVien(MaSV) {
    let sv = new SinhVien();
    this.listSinhVien = this.listSinhVien.filter((sinhvien) => {
      if (sinhvien.MaSV === MaSV) {
        sv = sinhvien;
      }
      return sinhvien.MaSV !== MaSV;
    });
    console.log("danh sach sinh vien sau khi xoa sinh vien: ", sv);
    console.log(this.listSinhVien);
  }
}
let danhsachSV = new DanhsachSV(dsSV);
console.log(danhsachSV);

console.log(danhsachSV);
class Khoa {
  constructor(MaKhoa, TenKhoa) {
    this.MaKhoa = MaKhoa;
    this.TenKhoa = TenKhoa;
  }
}

// thêm sinh viên mới
function handleAdd() {
  let allFielded = true;
  // console.log("formSV: ", formSV);
  const formSV = {
    MaSV: crudSV.txtMaSV.value,
    TenSV: crudSV.txtTenSV.value,
    NgaySinh: crudSV.txtNgaySinh.value,
    GioiTinh: crudSV.rdbGioiTinh.value,
    Khoa: crudSV.drpKhoa.value,
  };
  // neu co truong chua nhap thi khong luu
  function logWarning(element, text) {
    allFielded = false;
    console.log('wwarrrsd');
    let e = document.getElementById(element);
    e.innerText=`Vui lòng nhập ${text}`;
    e.style.display = 'block';
  }
  function unLogWarning(element) {
    document.getElementById(element).style.display = 'none';
  }
  // hiển thị ra lỗi trường trống
  if (formSV.MaSV === "") logWarning('warningMaSV', 'mã sinh viên');
  else unLogWarning('warningMaSV');
  if (formSV.TenSV === "") logWarning('warningTenSV', 'tên sinh viên');
  else unLogWarning('warningTenSV');
  if (formSV.Khoa === "") logWarning('warningKhoa', 'tên khoa');
  else unLogWarning('warningKhoa');


  if (allFielded) {
    const sv = new SinhVien(
      formSV.MaSV,
      formSV.TenSV,
      formSV.NgaySinh,
      formSV.GioiTinh,
      formSV.Khoa
    );
    danhsachSV.themSinhVien(sv);
    console.log("sv moi them: ", sv);
    setLocalStorage("listSinhVien", danhsachSV.getListSinhVien());
    crudSV.reset();
    renderListSinhVien(danhsachSV.getListSinhVien());
  } else {
    console.log("co truong chua nhap");
  }
}
// xác nhận thêm sinh viên mới
function confirmHandleEdit() {

  handleAdd();
  console.log("cap nhat sinh vien thanh cong");
  alert("bạn vừa cập nhật thành công sinh viên có mã sinh viên ", msv);
}
// khi người dùng ấn nút sửa ở trên danh sách kết quả
function handleEdit(masv) {
  console.log("sửa sinh viên ", masv);
  let sv = danhsachSV.timSinhVien(masv);
  crudSV.txtMaSV.value = sv.MaSV;
  crudSV.txtTenSV.value = sv.TenSV;
  crudSV.txtNgaySinh.value = sv.NgaySinh;
  crudSV.rdbGioiTinh.value = sv.GioiTinh;
  crudSV.drpKhoa.value = sv.Khoa;
  danhsachSV.xoaSinhVien(masv);

}
// khi người dùng nhấn nút xóa ở trên danh sách kết quả
function handleDelete(masv) {
  if (
    confirm(`bạn muốn xóa sinh viên có mã sinh viên ${masv} không?`) === true
  ) {
    danhsachSV.xoaSinhVien(masv);
    setLocalStorage("listSinhVien", danhsachSV.getListSinhVien());
  } else {
    alert("Không có sinh viên bị xóa");
  }

  renderListSinhVien(danhsachSV.getListSinhVien());
}

// khi người dùng chọn nhiều sinh viên để xóa
function handleDeleteAll() {
  let allsv = document.querySelectorAll(".sinhvienCheck");
  let listDelete = [];
  for (let i = 0; i < allsv.length; i++) {
    if (allsv[i].checked) {
      listDelete.push(allsv[i].value);
    }
  }
  listDelete.forEach((masv) => handleDelete(masv));
  console.log("listDelete: ", listDelete);
}

// xử lý tìm kiếm thông tin sinh viên 
function handleSearch() {
    const keyword = document.forms['searchSV'].txtTuKhoa.value;
    const type = document.forms['searchSV'].chbType.value;
    if(keyword === '') {
        alert('vui lòng nhập từ khóa để tìm kiếm');
        return;
    }
    let results = [];
    if(type == 'TenSV') {
        console.log('search theo TenSV');
        results = searchByTenSV(keyword);
    }
    if(type == 'MaSV') {
        console.log('search theo MaSV');
        results = searchByMaSV(keyword);
    }
    if(type == 'Khoa') {
        console.log('search theo Khoa');
        results = searchByMaKhoa(keyword);
    }
    console.log('results', results);
    renderListSinhVien(results);
}
// tìm kiếm theo tên sinh viên
function searchByTenSV(keyword) {
    dsSV = danhsachSV.getListSinhVien();
    console.log('search ');
    return dsSV.filter( sv => (sv.TenSV.includes(keyword) ) );
}
// tìm kiếm theo mã sinh viên
function searchByMaSV(keyword) {
  dsSV = danhsachSV.getListSinhVien();
  console.log('search ');
    return dsSV.filter( sv => (sv.MaSV.includes(keyword) ) );
}
// tìm kiếm theo tên khoa 
function searchByMaKhoa(keyword) {
    dsSV = danhsachSV.getListSinhVien();
    console.log('search ');
    return dsSV.filter( sv => (sv.Khoa.includes(keyword) ) );
    }

// hàm tạo 1 table để hiển thị danh sách kết quả
function createTable() {
  let tbl = document.createElement("table");
  tbl.classList.add("render__tbl");
  tbl.setAttribute("id", "render__tbl");
  document.getElementById("render").appendChild(tbl);
}
// hàm hiển thị ra danh sách sinh viên
function renderListSinhVien(dsach) {
  document.getElementById("render__tbl").innerHTML = `
  <tr class="render__heading">
      <th></th>
      <th>Mã SV</th>
      <th>Tên sinh viên</th>
      <th>Ngày sinh</th>
      <th>Khoa</th>
      <th></th>
      <th></th>
    </tr>

    ${dsach.map((sinhvien, index) => {
      return `
          <tr class="render__sv" id="sinhvien${index}">
      <td>
        <input type="checkbox"  class='sinhvienCheck' name="sinhvien" value='${sinhvien.MaSV}' />
      </td>
      <td>${sinhvien.MaSV}</td>
      <td>${sinhvien.TenSV}</td>
      <td>${sinhvien.NgaySinh}</td>
      <td>${sinhvien.Khoa}</td>
      <td>
        <button onclick="handleEdit('${sinhvien.MaSV}')">
          <i class="fa-solid fa-pen"></i>
        </button>
      </td>
      <td>
        <button onclick="handleDelete('${sinhvien.MaSV}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
          `;
    })}
  `;
  console.log("danh sách sinh viên: ", dsach);
}
