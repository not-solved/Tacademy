package myspring.di.xml.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

import myspring.di.xml.Hello;
import myspring.di.xml.Printer;

// 단순 실행 테스트
public class HelloBeanTest {
	
	public static void main(String[] args) {
		
		// IoC 컨테이너 생성 (config의 bean.xml 참조)
		ApplicationContext ac = new GenericXmlApplicationContext("config/beans.xml");
		
		// hello Bean 가져오기
		Hello hello = (Hello)ac.getBean("hello");
		System.out.println(hello.sayHello());
		
		// printer Bean 가져오기
		Printer printer = ac.getBean("printer", Printer.class);
		System.out.println(printer.toString());
	}
}
