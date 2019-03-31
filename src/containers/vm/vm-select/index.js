import React from 'react'
import { connect } from 'react-redux';

import { Row, Col, Table, Form, Button, Input, Icon, Select } from 'antd';

import { getList } from '../../../redux/modules/vm';

import ComTable from '../../../components/table/ComTable';
import OrgPopup from '../../../components/table/OrgPopup'
import { changeVisible } from "../../../redux/modules/OrgPopup"
import util from '../../../units/index'

const Option = Select.Option;

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
    render: (text, record, index) => {
        let className = text == "0" ? "dot" : "dot green";
        return <div className={className}></div>;
    }
}, {
    title: '设备',
    dataIndex: 'deviceStatus',
    render: (text, record, index) => {
        let className = text == "1" ? "dot" : "dot green";
        return <div className={className}></div>;
    }
}, {
    title: '操作',
    render: (text, record, index) => {
        return <div>
            <Button size="small">操作</Button>
        </div>;
    }
}];


class VmSelect extends ComTable {

    constructor(props) {
        super(props);
        this.req = {
            innerCode: "",
            nodeName2: "",
            isOnline: "",
            deviceStatus: ""
        }
        this.state = {
            showMore: this.showMore,
            req: this.req,
            data: [],
            loading: false,
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.getList(this.state.req, this.pagination);
    }

    onChange = (pagination, filters, sorter) => {
        this.props.getList(this.state.req, pagination);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    handleInput = (e) => {
        const name = e.target.name;
        if (!name) {
            return;
        }
        const req = { ...this.state.req };
        req[name] = e.target.value;
        this.setState({ req: req });
    }

    handleIsOnline = (value) => {
        const req = { ...this.state.req };
        req["isOnline"] = value;
        this.setState({ req: req });
    }

    handleDeviceStatus = (value) => {
        const req = { ...this.state.req };
        req["deviceStatus"] = value;
        this.setState({ req: req });
    }

    query = () => {
        this.props.getList(this.state.req, this.pagination);
    }

    reset = () => {
        super.reset();
    }

    selectOrg = () => {
        this.props.showOrg(true);
    }

    //选择组织回调方法
    selectOrgOkCB = (org) => {
        console.log(org);
        const req = this.state.req;
        req.orgName = org.orgName;
        this.setState({ req: req });
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Form className="ant-advanced-search-form">
                    <Row gutter={24}>
                        <Col span={6} key={0} >
                            <Form.Item label="机器编号：">
                                <Input placeholder="机器编号" value={this.state.req.innerCode} onChange={this.handleInput} name="innerCode" />
                            </Form.Item>
                        </Col>
                        <Col span={6} key={1} >
                            <Form.Item label="运营组织：">
                                <Input placeholder="运营组织" value={this.state.req.orgName} style={{ width: "180px" }} />
                                <Button size="small" onClick={this.selectOrg} style={{ float: "right", top: "6px" }}>选择</Button>
                            </Form.Item>
                        </Col>
                        <Col span={6} key={2} >
                            <Form.Item label="点位名称：">
                                <Input placeholder="点位名称" value={this.state.req.nodeName2} onChange={this.handleInput} name="nodeName2" />
                            </Form.Item>
                        </Col>
                        <Col span={6} key={3} >
                            <Form.Item label="费用状态：">
                                <Select >
                                    <Option value="1">正常使用</Option>
                                    <Option value="0">欠费中</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} key={4} >
                            <Form.Item label="联网状态：">
                                <Select value={this.state.req.isOnline} onChange={this.handleIsOnline} name="isOnline">
                                    <Option value="1">在线</Option>
                                    <Option value="0">离线</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} key={5} >
                            <Form.Item label="设备状态：">
                                <Select value={this.state.req.deviceStatus} onChange={this.handleDeviceStatus}>
                                    <Option value="0">正常</Option>
                                    <Option value="1">异常</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.query}>查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.reset}>
                                重置
                            </Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={super.toggle.bind(this)}>
                                展开 <Icon type={this.state.showMore ? 'down' : 'up'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.vmList}
                    loading={this.props.loading}
                    pagination={this.props.pagination}
                    onChange={this.onChange} />
                <OrgPopup selectOrgOkCB={this.selectOrgOkCB}></OrgPopup>
            </div>
        );
    }
}

//机器
const mapStateToProps = (state) => {
    var thatPagination = VmSelect.getPagination();
    if (state.vm.pagination) {
        thatPagination = state.vm.pagination;
    }
    return {
        vmList: state.vm.data ? state.vm.data.aaData : [],
        total: state.vm.data ? state.vm.data.iTotalRecords : 0,
        pagination: {
            ...thatPagination, total: state.vm.data ? state.vm.data.iTotalRecords : 0
        },
        loading: state.vm.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (req, pagination) => {
            dispatch(getList(req, pagination));
        },
        showOrg: (visible) => {
            dispatch(changeVisible(visible));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VmSelect);