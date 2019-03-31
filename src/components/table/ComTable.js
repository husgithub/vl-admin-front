import React, { Component } from 'react'
import { Row, Col, Table, Form, Button, Input, Icon, Select } from 'antd';


class ComTable extends Component {
    constructor(props) {
        super(props);
        //分页参数
        this.pagination = {
            current: 1,
            pageSize: 10,
            size: "small",
            showSizeChanger: true,
            showTotal: function (total) {
                return `总共 ${total} 条`;
            }
        }
        //展开更多
        this.showMore = false;
    }
    //获取分页
    static getPagination() {
        return this.pagination;
    }
    //展开更多
    toggle() {
        debugger;
        this.setState({
            showMore: !this.state.showMore
        })
    }
    //重置
    reset() {
        debugger;
        var req = { ...this.state.req };
        for (let key in req) {
            if (req[key]) {
                req[key] = "";
            }
        }
        this.setState({ req: req });
        this.pagination.current = 1;
    }

}
export default ComTable;