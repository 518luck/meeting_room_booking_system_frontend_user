import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login" className="text-cyan-200">
            登录
          </Link>
        </li>
        <li>
          <Link to="/register">注册</Link>
        </li>
        <li>
          <Link to="/update_password">更新密码</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
