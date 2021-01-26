package myspring.di.xml.test;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import myspring.di.xml.Hello;
import myspring.di.xml.Printer;

import java.util.List;

// Spring의 방식으로 테스트
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:config/beans.xml")
public class HelloBeanSpringTest {
	
	@Autowired
	ApplicationContext ac;
		
	@Test
	public void bean1() {
		
		Hello hello = (Hello)ac.getBean("hello2");
		Assert.assertEquals("Hello Spring", hello.sayHello());
		hello.print();
		
		Printer printer = ac.getBean("printer", Printer.class);
		Assert.assertEquals("Hello Spring", printer.toString());
		Assert.assertEquals(3, hello.getNames().size());
		
		List<String> list = hello.getNames();
		for(String value : list)
			System.out.println(value);
	}
}
