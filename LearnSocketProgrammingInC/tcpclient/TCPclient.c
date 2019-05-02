#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>// content most important io socket that need to create the socket

#include<netinet/in.h>

int main(){
	// create a socket for client.
	int network_socket;
	network_socket = socket(AF_INET, SOCK_STREAM,0 ) ;// (doman of socket , type of socket similar to TCP ,specify protoca)

	// specify the address  socket and port to connect to
	struct sockaddr_in server_address;
	server_address.sin_family = AF_INET;//So this sets the family of the address so it knows what type of address we are working with here.

	server_address.sin_port = htons(9002); // So that's all you have to do to specify the port that you want to connect to remotely now that you have
	server_address.sin_addr.s_addr = INADDR_ANY;

	// call connect function
	int connection_status = connect(network_socket, (struct sockaddr * ) &server_address, sizeof(server_address));
	//check for erroer with the connection 
	if (connection_status == -1){
		printf("there is some thing went wrong \n\n" );
	}
	// recieve data from the server
	char server_response[256];
	recv(network_socket, &server_response,sizeof(server_response),0); // (our socket name, location that we want to put the actual data, size fo that particular date)  
	//print out the date that we get back
	printf("the server sent the date: %s \n",server_response );
	close(network_socket);


	return 0;
}