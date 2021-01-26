package myspring.di.xml.test;

import org.junit.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

import myspring.di.xml.Hello;
import myspring.di.xml.Printer;

// JUnit으로 테스트
public class HelloBeanJunitTest {

	ApplicationContext ac;
	
	@Before
	public void init() {
		
		// IoC 컨테이너 생성
		ac = new GenericXmlApplicationContext("classpath:config/beans.xml");
	}
	
	@Test
	public void bean1() {
		Hello hello = (Hello)ac.getBean("hello");
		
		Assert.assertEquals("Hello Spring", hello.sayHello());
		hello.print();
		
	}
	
	@Test
	public void bean2() {
		Printer printer1 = (Printer)ac.getBean("printer");
		Printer printer2 = ac.getBean("printer", Printer.class);
		
		Assert.assertSame(printer1, printer2);
	}
}
