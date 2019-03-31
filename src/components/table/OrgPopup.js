import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col, Table, Form, Button, Input, Icon, Select, Modal } from 'antd';
import SystemUtil from '../../units/SystemUtil';
import { changeVisible } from "../../redux/modules/OrgPopup"
import util from '../../units/index';
import { Tree } from 'antd';

const { TreeNode } = Tree;

const ORG_GETMYORGLIST = '/org/getMyOrgList.do';

class OrgPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: []
    }
    this.queryChildOrg();
  }
  handleCancel = (e) => {
    this.props.changeVisible(false);
  }

  //添加子节点
  addNodes = (menuArr, arr) => {
    let _self = this;
    if (arr.length !== 0) {
      for (var i = 0; i < menuArr.length; i++) {
        menuArr[i].children = [];
        for (var j = 0; j < arr.length; j++) {
          if (menuArr[i].id === arr[j].parentId) {
            menuArr[i].children.push(arr[j]);
            arr.splice(j, 1);
            j--;
          }
        }
        _self.addNodes(menuArr[i].children, arr);
      }
    }
    return menuArr;
  };

  //查询当前组织的自组织
  queryChildOrg() {
    let _self = this;
    const getCurrentOrgCallBack = (resp) => {
      console.log(resp);
      if (!resp.success) {
        console.error("查询失败！");
        return;
      }
      const org = resp.org;
      const getMyOrgListCallBack = (resp) => {
        console.log(resp);
        if (!resp.success) {
          console.error("查询失败！");
          return;
        }
        let arr = resp.data.map(obj => {
          let newObj = {
            title: obj.orgName,
            key: obj.id,
            ...obj
          }
          return newObj;

        });                 //原始的组织数据
        let menuArr = [];                    //树形结构数组
        //寻找根节点
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].parentId === 0) {
            menuArr.push(arr[i]);
            arr.splice(i, 1);
            i--;
          }
        }
        menuArr = _self.addNodes(menuArr, arr);
        this.setState({ treeData: menuArr });
      }
      util.post(ORG_GETMYORGLIST, { id: org.id }, getMyOrgListCallBack)
    }
    SystemUtil.getCurrentOrg(getCurrentOrgCallBack);
  }



  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    //console.log('onSelect', info);
    this.setState({ selectedKeys });
    this.props.selectOrgOkCB(info.selectedNodes[0].props.dataRef);
    this.props.changeVisible(false);
  }
  renderTreeNodes = data => data.map((item) => {
    const orgTypeIcons = { 1: "", 2: "", 3: "", 4: "", 5: "" };
    const icon = <Icon type={'frown'} />;
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })

  render() {
    debugger;
    const { visible } = this.props;
    return (
      <div>
        <Modal
          title="组织选择"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Tree
            showLine={true}  /*是否展示连接线*/
            multiple={false}  /*支持点选多个节点（节点本身）*/
            defaultExpandAll={true}   /*默认展开所有节点*/
            checkable={false}
            autoExpandParent={true}  /*支持展开父节点*/
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(this.state.treeData)}
          </Tree>
        </Modal>
      </div >
    )
  }

}
const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.orgPopup.visible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeVisible: (visible) => {
      dispatch(changeVisible(visible));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgPopup);

