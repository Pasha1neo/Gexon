import {connect} from 'react-redux'
import {compose} from 'redux'
import {useEffect, useState} from 'react'
import {withRouter} from 'react-router'
import _ from 'lodash'
import UsersList from './Users'

const data = [
    {
        _id: '603a8775434f3222f469dab9',
        login: 'pasha1neo',
        avatar: 'l6U.jpeg',
        nickname: 'Паша',
    },
    {
        _id: '603a9cade54a4f211082aa6e',
        login: 'pavel1neo',
    },
    {
        _id: '604a75e32cea2f2ef0653eb6',
        login: 'pasha1one',
    },
    {
        _id: '6072cb012483083670b63038',
        login: 'pasha1onex',
    },
    {
        _id: '608e9f46b3287e37e08ace8a',
        login: 'pppp',
    },
]
const UsersContainer = (props) => {
    return <UsersList users={data} />
}

const mapStateToProps = (state) => ({
    users: state.chat.usersData,
})
export default compose(withRouter, connect(mapStateToProps, {}))(UsersContainer)
