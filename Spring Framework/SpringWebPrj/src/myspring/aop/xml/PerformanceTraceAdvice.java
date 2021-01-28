package myspring.aop.xml;

import org.aspectj.lang.ProceedingJoinPoint;

public class PerformanceTraceAdvice {
	
	public Object trace(ProceedingJoinPoint joinPoint) throws Throwable {
		
		// 타겟 메서드의 signature 정보
		String signatureString = joinPoint.getSignature().toShortString();
		System.out.println(signatureString + " 시작");
		
		// 호출되기 전 시간 (시작 시간)
		long start = System.currentTimeMillis();
		try {
			// 호출
			Object result = joinPoint.proceed();
			return result;
		}
		finally {
			
			// 호출 후 반납한 시간 (종료 시간)
			long finish = System.currentTimeMillis();
			
			System.out.println(signatureString + " 종료");
			System.out.println(signatureString + " 실행시간 : " + (finish - start) + " ms" );
		}
	}
}
