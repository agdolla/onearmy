import React from 'react'
import {
  COMMUNITY_PAGES,
  COMMUNITY_PAGES_MORE,
  COMMUNITY_PAGES_PROFILE,
} from 'src/pages'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Icon from 'src/components/Icons'
import { LoginComponent } from '../../Login/Login'
import { Avatar } from 'src/components/Avatar'
import { Content, Links, Profile, LinkButton, ListButton } from './elements'
import { UserStore } from 'src/stores/User/user.store'
import { inject, observer } from 'mobx-react'
import Text from 'src/components/Text'
import { Box } from 'rebass'
import theme from 'src/themes/styled.theme'

interface IState {
  moreMenuAnchor: any
  profileMenuAnchor: any
}

interface IProps {
  title: string
  description: string
}

interface IInjectedProps extends IProps {
  userStore: UserStore
}

@inject('userStore')
@observer
export class CommunityHeader extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      moreMenuAnchor: null,
      profileMenuAnchor: null,
    }
  }
  get injected() {
    return this.props as IInjectedProps
  }

  // function receives clicked element which then sets itself as an 'anchor'
  // for displaying the dropdown menu
  openMoreMenu = (e: React.MouseEvent) => {
    this.setState({
      moreMenuAnchor: e.currentTarget,
    })
  }

  openProfileMenu = (e: React.MouseEvent) => {
    this.setState({
      profileMenuAnchor: e.currentTarget,
    })
  }
  closeMoreMenu = () => {
    this.setState({ moreMenuAnchor: null })
  }
  closeProfileMenu = () => {
    this.setState({ profileMenuAnchor: null })
  }

  logout() {
    this.injected.userStore.logout()
    this.closeProfileMenu()
  }

  render() {
    const { moreMenuAnchor, profileMenuAnchor } = this.state
    const user = this.injected.userStore.user
    return (
      <div>
        <Content>
          <Text large caps bold>
            One Army
          </Text>
          <Links>
            {COMMUNITY_PAGES.map(page => (
              <LinkButton
                className="nav-link"
                to={page.path}
                activeClassName="link-active"
                key={page.path}
              >
                {page.title}
              </LinkButton>
            ))}
            <ListButton
              className="nav-link"
              variant="text"
              onClick={this.openMoreMenu}
            >
              More
            </ListButton>
            <Menu
              open={moreMenuAnchor ? true : false}
              anchorEl={moreMenuAnchor}
              className="nav__more-menu"
              style={{ marginTop: '3em' }}
            >
              <ClickAwayListener onClickAway={this.closeMoreMenu}>
                <div>
                  {COMMUNITY_PAGES_MORE.map(page => (
                    <MenuItem onClick={this.closeMoreMenu} key={page.path}>
                      <LinkButton
                        className="nav-link"
                        to={page.path}
                        activeClassName="link-active"
                      >
                        {page.title}
                      </LinkButton>
                    </MenuItem>
                  ))}
                </div>
              </ClickAwayListener>
            </Menu>
          </Links>
          {user ? (
            <>
              <Profile onClick={this.openProfileMenu}>
                <Avatar userName={user.userName} />
                <Icon glyph={'arrow-down'} />
              </Profile>
              <Menu
                open={profileMenuAnchor ? true : false}
                anchorEl={profileMenuAnchor}
                className="nav__more-menu"
                style={{ marginTop: '3em' }}
              >
                <ClickAwayListener onClickAway={this.closeProfileMenu}>
                  <>
                    <Text p={8} bold>
                      {user.userName}
                    </Text>
                    {COMMUNITY_PAGES_PROFILE.map(page => (
                      <MenuItem onClick={this.closeProfileMenu} key={page.path}>
                        <LinkButton
                          className="nav-link"
                          to={page.path}
                          activeClassName={'link-active'}
                        >
                          {page.title}
                        </LinkButton>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
                  </>
                </ClickAwayListener>
              </Menu>
            </>
          ) : (
            <LoginComponent />
          )}
        </Content>
        <Box bg={'grey4'} width={1} p={3}>
          <Text small width={theme.maxContainerWidth + 'px'} m={'0 auto'}>
            {this.props.description}
          </Text>
        </Box>
      </div>
    )
  }
}
