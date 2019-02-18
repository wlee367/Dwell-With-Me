import { connect } from 'react-redux';

import { loginUser } from '../../redux/session/index';

import LoginView from './LoginView';

import translations from '../../i18n';

class Login extends Component {
    static navigationOptions = {
        tabBarLabel: translations.t('login'),
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../assets/splash.png')}
                style={{ tintColor: tintColor }}
            />
        )
    };

    render() {
        return <LoginView login={this.props.login} />;
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    login: loginUser
};

export default connect(
    null,
    mapDispatchToProps
)(Login);
