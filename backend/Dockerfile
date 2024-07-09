FROM node:18

# # Install basic development tools
# RUN apt update && apt install -y less man-db sudo

# # Ensure default `node` user has access to `sudo`
# ARG USERNAME=node
# RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#     && chmod 0440 /etc/sudoers.d/$USERNAME

# 以下手動で追加
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "dev"]
