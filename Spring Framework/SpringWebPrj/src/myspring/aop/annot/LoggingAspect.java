package myspring.aop.annot;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {
	
	@Before("execution(public * myspring..*(..))")
	public void before(JoinPoint jp) {
		String signatureString = jp.getSignature().getName();	
		System.out.println("@Before [ " + signatureString + " ] �޼��� ���� ��ó�� ����");		
		for (Object arg : jp.getArgs()) {
			System.out.println("@Before [ " + signatureString + " ] �ƱԸ�Ʈ " + arg);			
		}		
	}
    @AfterReturning(pointcut="execution(public * myspring.user.service.*.*(..))", returning="ret")
	public void afterReturning(JoinPoint jp, Object ret) {
		String signatureString = jp.getSignature().getName();		
		System.out.println("@AfterReturing [ " + signatureString + " ] �޼��� ���� ��ó�� ����");
		System.out.println("@AfterReturing [ " + signatureString + " ] ���ϰ�=" + ret);

	}
    
    @AfterThrowing(pointcut="execution(* *..UserService*.*(..))", 
    		throwing="ex")
	public void afterThrowing(JoinPoint jp, Throwable ex) {
		String signatureString = jp.getSignature().getName();	
		System.out.println("@AfterThrowing [ " + signatureString + " ] �޼��� ���� �� ���� �߻�");
		System.out.println("@AfterThrowing [ " + signatureString + " ] ����=" + ex.getMessage());
	}
    
    @After("execution(* *..*.*User(..))")
	public void afterFinally(JoinPoint jp) {
		String signatureString = jp.getSignature().getName();
		System.out.println("@After [ " + signatureString + " ] �޼��� ���� �Ϸ�");
	}
}
