package info;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
/**
 * Servlet implementation class checkInfo1
 */
@WebServlet("/checkInfo1")
public class checkInfo1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public checkInfo1() {
        super();
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String usernameInput=request.getParameter("username");
		String passwordInput=request.getParameter("password");
		String emailInput=request.getParameter("email");
		String birthdayInput=request.getParameter("birthday");
		//Output text which is sent to client
		String textOutput="";
		
		String emailValidateNotify="";
		final String email_regex= "^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$";
		Pattern pattern=Pattern.compile(email_regex, Pattern.CASE_INSENSITIVE);
		Matcher matcher=pattern.matcher(emailInput);
		if(!matcher.matches()){
			emailValidateNotify="Email wrong format";
		}
		textOutput+=emailValidateNotify+"\n";
		String dateValidateNotify="";
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
	    java.util.Date currentDate=new java.util.Date();
		try {
			java.util.Date parsedBirthday = formatter.parse(birthdayInput);
			//java.util.Date parsedCurrentDate=formatter.parse(currentDate);
			if(!parsedBirthday.before(currentDate)){
				dateValidateNotify="Your Birthday > Current Date (It's illegal date)";
			}
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		textOutput+=dateValidateNotify+"\n";
		
		
		Connection myConn=null;
		Statement mySta1=null;
		ResultSet myRes=null;

		try{
			//System.out.println("passwordInput");
			boolean exist=false;
			//Init a connection to demo database 
			Class.forName("com.mysql.cj.jdbc.Driver"); 
			myConn=DriverManager.getConnection("jdbc:mysql://localhost:3306/demo?useSSL=false&allowPublicKeyRetrieval=true","student","student");
			mySta1=myConn.createStatement();
			myRes=mySta1.executeQuery("select username from user");
			
			response.setContentType("text/blank;charset=UTF-8");
			PrintWriter out=response.getWriter();
			while(myRes.next()){
				if(myRes.getString("username").equals(usernameInput)){
					textOutput+="User exist\n";
					out.print(textOutput);
					exist=true;
				}
			}
			if(!exist){
				//System.out.println("test!!!!");
				 java.util.Date date= new SimpleDateFormat("MM/dd/yyyy").parse(birthdayInput);
				 java.sql.Date sqldate=new java.sql.Date(date.getTime()); 
				 PreparedStatement mySta2;
				  mySta2=myConn.prepareStatement(
						"insert into user " +
						"(username, password, email,birthday) " + 
						"values " + 
						"(?,?,?,?)");
				  mySta2.setString(1, usernameInput);
				  mySta2.setString(2, passwordInput);
				  mySta2.setString(3, emailInput);
				  mySta2.setDate(4, sqldate);
				  mySta2.executeUpdate();
				  textOutput+="Your user account has been added to our account";
				out.print(textOutput);
				System.out.println("Your account has been added to our account");
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
	}

	}

