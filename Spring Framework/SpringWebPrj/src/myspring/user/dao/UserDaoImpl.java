package myspring.user.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import myspring.user.vo.UserVO;

// @Repository("userDao")
public class UserDaoImpl implements UserDao{
	
	@Autowired
	private SqlSession session;
	
	@Override
	public UserVO read(String id) {
		UserVO user = session.selectOne("userNS.selectUserById", id);
		return user;
	}
	
	@Override
	public List<UserVO> readAll() {
		List<UserVO> userList = session.selectList("userNS.selectUserList");
		return userList;
	}

	
	@Override
	public void insert(UserVO user) {
		session.update("userNS.insertUser", user);
		System.out.println("추가된 사용자 : " + user);
	}

	@Override
	public void update(UserVO user) {
		session.update("userNS.updateUser", user);
		System.out.println("수정된 사용자 : " + user);

	}

	@Override
	public void delete(String id) {
		session.delete("userNS.deleteUser", id);
		System.out.println(id + "번 사용자 삭제");

	}

}
