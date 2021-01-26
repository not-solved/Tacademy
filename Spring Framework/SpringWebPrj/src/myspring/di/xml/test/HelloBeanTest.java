package myspring.di.xml.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

import myspring.di.xml.Hello;
import myspring.di.xml.Printer;

// �ܼ� ���� �׽�Ʈ
public class HelloBeanTest {
	
	public static void main(String[] args) {
		
		// IoC �����̳� ���� (config�� bean.xml ����)
		ApplicationContext ac = new GenericXmlApplicationContext("config/beans.xml");
		
		// hello Bean ��������
		Hello hello = (Hello)ac.getBean("hello");
		System.out.println(hello.sayHello());
		
		// printer Bean ��������
		Printer printer = ac.getBean("printer", Printer.class);
		System.out.println(printer.toString());
	}
}
