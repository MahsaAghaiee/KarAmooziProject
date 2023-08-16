import { Button, Table, Empty, Tooltip } from "antd";
import {
  EyeOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  ReadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "./ResultTable.css";

function ResultTable() {
  const data = [
    {
      id: 1,
      pooyeshgar: "nmap",
      settingPooyesh: "test-3",
      address: "192.168.3.2",
      name: "vc50vvvvvtrftrftvccvtrdtvc",
      OS: "HP iLo 4 remote managment interface",
      createTime: " 00:20:33 1402/03/23",
      added: true,
    },
    {
      id: 2,
      pooyeshgar: "nmap",
      settingPooyesh: "test-3",
      address: "192.168.3.2",
      name: "vc50vvvvvtrftrftvccvtrdtvc",
      OS: "HP iLo 4 remote managment interface",
      createTime: " 00:20:33 1402/03/23",
      added: false,
    },
    {
      id: 3,
      pooyeshgar: "nmap",
      settingPooyesh: "test-3",
      address: "192.168.3.2",
      name: "vc50vvvvvtrftrftvccvtrdtvc",
      OS: "HP iLo 4 remote managment interface",
      createTime: " 00:20:33 1402/03/23",
      added: true,
    },
  ];
  const columns = [
    {
      // <SortAscendingOutlined className="test" />
      title: "پویشگر",
      dataIndex: "pooyeshgar",
      key: "pooyeshgar",
      align: "center",
      render: (text) => (
        <a id="click-pooyeshgar" href="#">
          {text}
        </a>
      ),
    },
    {
      title: "تنظیمات پویش ",
      dataIndex: "settingPooyesh",
      key: "settingPooyesh",
      align: "center",
    },
    {
      title: "آدرس شبکه",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "سیستم عامل",
      dataIndex: "OS",
      key: "OS",
      align: "center",
    },
    {
      title: "زمان ایجاد",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
    },
    {
      title: "افزوده شده به پایگاه دانش",
      dataIndex: "added",
      key: "added",
      //   render: (added) => (added ? "True" : "False"),
      render: (added) =>
        added ? (
          <CheckOutlined style={{ fontSize: 18, color: "green" }} />
        ) : (
          <CloseOutlined style={{ fontSize: 18, color: "red" }} />
        ),
      align: "center",
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Tooltip
            placement="bottomLeft"
            title="مشاهده جزئیات"
            overlayClassName="result-table-tooltip"
          >
            <EyeOutlined
              className="my-icon"
              style={{ marginRight: 8, fontSize: 18 }}
            />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title="حذف"
            overlayClassName="result-table-tooltip"
          >
            <DeleteOutlined
              className="my-icon result-table-delete-icon"
              style={{ marginRight: 16, fontSize: 18 }}
              onClick={() => {
                handleDelete(record.id);
              }}
            />
          </Tooltip>
        </>
      ),
      align: "center",
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelect = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelect,
  };

  const [dataSource, setDataSource] = useState(data);
  const paginationConfig = {
    position: ["none", "none"],
  };
  const handleDelete = (id) => {
    var answer = window.confirm("آیا از حذف این پویش اطمینان دارید؟");
    if (answer) {
      setDataSource(dataSource.filter((item) => item.id !== id));
    }
  };
  const onDelete = () => {
    var deleteAct;
    selectedRowKeys.length > 1
      ? (deleteAct = "آیا از حذف تمام پویش‌های انتخاب شده اطمینان دارید؟")
      : (deleteAct = "آیا از حذف این پویش اطمینان دارید؟");
    var answer = window.confirm(deleteAct);
    if (answer) {
      setDataSource(
        dataSource.filter((user) => !selectedRowKeys.includes(user.id))
      );
      setSelectedRowKeys([]);
    }
  };
  //---------- add
  const onAdd = () => {
    var addTextAlert;
    selectedRowKeys.length > 1
      ? (addTextAlert =
          "آیا از افزودن تمامی پویش‌های انتخاب شده به پایگاه دانش اطمینان دارید؟")
      : (addTextAlert = "آیا از افزودن این پویش به پایگاه دانش اطمینان دارید؟");
    var answer = window.confirm(addTextAlert);
    if (answer) {
      //show information page
      //show a succsess notification for user
      // selectedRowKeys([]);
    }
  };
  //----------
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };
  const hasSelected = selectedRowKeys.length > 0;
  let locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={<span>هیچ داده ای برای نمایش وجود ندارد.</span>}
      ></Empty>
    ),
  };
  return (
    <>
      <div
        style={{ marginBottom: 16, direction: "rtl" }}
        className="result-table-buttons"
      >
        <Button
          onClick={onAdd}
          disabled={selectedRowKeys.length === 0}
          id="add-selected"
        >
          <PlusOutlined
            // className={selectedRowKeys.length > 0 ? "greenable" : ""}
            PlusOutlined
          />
          افزودن به پایگاه دانش
        </Button>
        <Tooltip
          placement="bottomLeft"
          title="بارگذاری مجدد"
          overlayClassName="result-table-tooltip"
        >
          <Button
            id="reload"
            className="icon-color"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
            icon={<ReloadOutlined />}
          >
            {/* بارگذاری مجدد */}
          </Button>
        </Tooltip>
        <Tooltip>
          <Tooltip
            placement="bottomLeft"
            title="حذف نتایج"
            overlayClassName="result-table-tooltip"
          >
            <Button
              id="delete-selected-result"
              className="icon-color"
              onClick={onDelete}
              disabled={selectedRowKeys.length === 0}
              icon={<DeleteOutlined />}
            >
              {/* حذف نتایج */}
            </Button>
          </Tooltip>
        </Tooltip>
      </div>

      <div>
        <Table
          className="result-table"
          columns={columns}
          dataSource={dataSource}
          style={{ direction: "rtl" }}
          bordered
          pagination={paginationConfig}
          rowSelection={rowSelection}
          rowKey={"id"}
          locale={locale}
        />
      </div>

      <div dir="rtl" style={{ marginTop: 15, marginRight: 20 }}>
        <span style={{ marginLeft: 8, padding: 30, marginTop: 30 }}>
          {selectedRowKeys.length > 0
            ? `${selectedRowKeys.length} پویش انتخاب شد.`
            : ""}
        </span>
      </div>
    </>
  );
}
export default ResultTable;
