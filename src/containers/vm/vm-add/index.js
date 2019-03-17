import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'element-react';

import 'element-theme-default';

const columns = [{
    title: '机器编号',
    dataIndex: 'innerCode',
}, {
    title: '点位名称',
    dataIndex: 'nodeName',
}, {
    title: '运营组织',
    dataIndex: 'orgName',
}, {
    title: '缺品',
    dataIndex: 'mdseNumLack',
}, {
    title: '上次补货',
    dataIndex: 'lastBHTime',
}, {
    title: '货量',
    dataIndex: 'mdseRate',
}, {
    title: '机型 ',
    dataIndex: 'typeName',
}, {
    title: '联网',
    dataIndex: 'isOnline',
}, {
    title: '设备',
    dataIndex: 'deviceStatus',
}, {
    title: '操作',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        innerCode: `Edward King ${i}`,
        nodeName: 32,
        orgName: `London, Park Lane no. ${i}`,
        mdseNumLack: `London, Park Lane no. ${i}`,
        lastBHTime: `London, Park Lane no. ${i}`,
        mdseRate: `London, Park Lane no. ${i}`,
        typeName: `London, Park Lane no. ${i}`,
        isOnline: `London, Park Lane no. ${i}`,
        deviceStatus: `London, Park Lane no. ${i}`,
        address: `London, Park Lane no. ${i}`
    });
}

class VmSelect extends React.Component {
    
    render() {
        return (
            <Button type="primary">Hello</Button>
        );
    }
}

export default VmSelect;