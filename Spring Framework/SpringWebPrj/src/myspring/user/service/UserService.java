package myspring.user.service;

import java.util.List;
import myspring.user.vo.UserVO;

public interface UserService {
	
	public void insertUser(UserVO user);
	public void deleteUser(String id);
	public void updateUser(UserVO user);
	public UserVO getUser(String id);
	public List<UserVO> getUserList();
}
